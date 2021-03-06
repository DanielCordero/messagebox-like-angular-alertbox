import { Component, style } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { SimpleDialogComponent } from "./simple-dialog/simple-dialog.component";
import { MessageBox, MessageBoxButton, MessageBoxStyle } from "./_shared/message-box";
import { MessageService } from "./_shared/message.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title;
  message;
  information;
  button;
  style;
  allow_outside_click;
  width;
  buttons = [
    {value: MessageBoxButton.Ok, display: "Ok"},
    {value: MessageBoxButton.OkCancel, display: "Ok/Cancel"},
    {value: MessageBoxButton.YesNo, display: "Yes/No"},
    {value: MessageBoxButton.AcceptReject, display: "Accept/Reject"},
  ];
  style_full = MessageBoxStyle.Full;
  style_simple = MessageBoxStyle.Simple;
  subscriber: Subscription;
  constructor(
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
    this.subscriber = this.messageService.getMessage().subscribe(message => {
        MessageBox.show(this.dialog, message.text);
    });
  }
  onShowClick() {
    this.width = (this.width !== undefined && this.width !== "px") ? this.width + "px" : "350px";
    MessageBox.show(this.dialog, this.message, this.title, this.information,
      this.button,this.allow_outside_click, this.style, this.width).subscribe( result => {
        const respone = (result === undefined) ? "none" : result.result;
        MessageBox.show(this.dialog, `User response : ${respone}`);
    });
    this.width = this.width.replace("px", "");
  }
  onSendService() {
    this.messageService.sendMessage(this.message);
  }
}
