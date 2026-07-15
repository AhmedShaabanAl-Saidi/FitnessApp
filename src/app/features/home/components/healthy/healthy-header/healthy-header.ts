import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-healthy-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="height:300px;background:red;color:white;
    display:flex;align-items:center;justify-content:center;
    font-size:40px;font-weight:bold">
      HEALTHY HEADER WORKS
    </div>
  `
})
export class HealthyHeader {}
