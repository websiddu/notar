import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.css']
})
export class SpinnerComponent implements OnInit {

   private currentTimeout: number;
    private isDelayedRunning: boolean = false;

    @Input() public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
        }

        if (this.currentTimeout) {
            // return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }

  ngOnInit() {

  }

}
