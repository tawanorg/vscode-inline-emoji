import * as vscode from "vscode";
import { Emoji, EmojiItem } from "./emoji";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let startCommand = vscode.commands.registerCommand(
    "vscode-emoji-all.start",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("vscode-emoji-all is initialized!");
    }
  );

  const languages = [
    "typescriptreact",
    "typescript",
    "javascript",
    "javascriptreact",
    "markdown",
    "plaintext",
  ];

  const emoji = new Emoji();

  const completionItems: vscode.ProviderResult<vscode.CompletionItem[]> = [];

  for (const key in emoji.emoji) {
    const emojiKey = key as keyof EmojiItem;
    const emojiCompletion = new vscode.CompletionItem({
      label: key,
      // description: "description",
      detail: ` ${emoji.get(emojiKey)}`,
    });
    emojiCompletion.insertText = new vscode.SnippetString(
      `${emoji.get(emojiKey)} $1`
    );
    completionItems.push(emojiCompletion);
  }

  languages.forEach((language) => {
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        language,
        {
          provideCompletionItems() {
            return completionItems;
          },
        },
        ":"
      )
    );
  });

  context.subscriptions.push(startCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
