import * as vscode from "vscode";
import { fetchAltText } from "./apiClient";

export class AltTextCodeActionProvider implements vscode.CodeActionProvider {
  constructor(private diagnostics: vscode.DiagnosticCollection) {}

  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction[] | undefined {
    const actions: vscode.CodeAction[] = [];
    const diagnostic = this.diagnostics.get(document.uri)?.find(d => d.range.intersection(range));

    if (diagnostic && diagnostic.code === "missingAltText") {
      const fix = new vscode.CodeAction(
        "Gerar texto alternativo via IA",
        vscode.CodeActionKind.QuickFix
      );

      fix.command = {
        command: "altTextChecker.generateAlt",
        title: "Gerar texto alternativo",
        arguments: [document, diagnostic.range]
      };
      fix.diagnostics = [diagnostic];
      actions.push(fix);
    }

    return actions;
  }
}
