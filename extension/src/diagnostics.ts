import * as vscode from "vscode";

export function updateDiagnostics(
  document: vscode.TextDocument,
  collection: vscode.DiagnosticCollection
): void {
  if (!["html", "javascriptreact", "typescriptreact"].includes(document.languageId)) {
    return;
  }

  const diagnostics: vscode.Diagnostic[] = [];
  const regex = /<img(?![^>]*\balt=)[^>]*>/g;

  const text = document.getText();
  let match;
  while ((match = regex.exec(text)) !== null) {
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);

    const diagnostic = new vscode.Diagnostic(
      new vscode.Range(startPos, endPos),
      "Missing 'alt' attribute in <img> tag.",
      vscode.DiagnosticSeverity.Warning
    );
    diagnostic.code = "missingAltText";

    diagnostics.push(diagnostic);
  }

  collection.set(document.uri, diagnostics);
}
