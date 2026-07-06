import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tabs',
  imports: [NgClass],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs {
  tabs = input<TabItem[]>([]);
  activeTabId = input<string>('');

  tabChange = output<string>();
}
