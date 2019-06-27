import { Component } from '@angular/core';

@Component({
    selector: 'header-component',
    template: `
    <header style="position:fixed">
        <div class="container noTopPadding" style="margin-left: 250px">
            <div class="floatLeft productTitle productTitleWide">
                <a>
                <img src="assets/img/iotp.png" class="floatLeft" style="width: 30px; margin-right: 15px; margin-top: 9px;">
               <strong>Power, Energy & Machine Analyzer </strong>
                </a>
            </div>
            
            <div class="floatRight">
                <p class="floatRight medium-show large-hide">
                </p>
            </div>
        </div>
    </header>`
})

export class HeaderComponent { };