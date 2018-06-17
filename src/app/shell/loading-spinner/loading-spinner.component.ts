import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
<svg class="lds-spinner" width="200px"  height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;">
<g transform="rotate(0 50 50)">
<rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-1.4666666666666668s" repeatCount="indefinite"></animate>
</rect>
</g><g transform="rotate(30 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-1.3333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-1.2s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-1.0666666666666667s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-0.9333333333333335s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-0.8000000000000002s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-0.5333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-0.4000000000000001s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-0.26666666666666666s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
  <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="-0.13333333333333333s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#17a2b8">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.6s" begin="0s" repeatCount="indefinite"></animate>
  </rect>
</g></svg>
  `,
  styles: []
})
export class LoadingSpinnerComponent {

  constructor() { }
}
