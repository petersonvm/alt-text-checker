import * as vscode from "vscode";
import { updateDiagnostics } from "./diagnostics";
import { AltTextCodeActionProvider } from "./codeActions";

export function activate(context: vscode.ExtensionContext) {
  const diagnosticCollection = vscode.languages.createDiagnosticCollection("altTextChecker");

  if (vscode.window.activeTextEditor) {
    updateDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection);
  }

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(e => updateDiagnostics(e.document, diagnosticCollection)),
    vscode.workspace.onDidOpenTextDocument(doc => updateDiagnostics(doc, diagnosticCollection)),
    diagnosticCollection
  );

  // Registrar Quick Fix provider
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      ["html", "javascriptreact", "typescriptreact"],
      new AltTextCodeActionProvider(diagnosticCollection),
      { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] }
    )
  );
}

export function deactivate() {}