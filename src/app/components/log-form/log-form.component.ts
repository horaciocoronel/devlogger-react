import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';

import { Log } from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
	id: string;
	text: string;
	date: any;

	isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
		//Subscribe to the selectedLog observable
		this.logService.selectedLog.subscribe(log => {
		// If statement to know if the log title was clicked
		if(log.id !== null) {
			this.isNew = false;
			this.id = log.id;
			this.text = log.text;
			this.date = log.date;
		}
	});
  }
	// Handles what happens when the user clicks the 'Add Log button'
	onSubmit() {
		// Check if new log
		if(this.isNew) {
			const newLog = {
				id: this.generateId(),
				text: this.text,
				date: new Date()
			}
			// Add Log
			this.logService.addLog(newLog);
		} else {
			// Create Log to be updated
			const updLog = {
				id: this.id,
				text: this.text,
				date: new Date()
			}
			// Update Log
			this.logService.updateLog(updLog)
		}

		// Clear State
		this.clearState();
	}

	clearState() {
		// Set isNew to True
		this.isNew = true;
		this.id = '';
		this.text = '';
		this.date = '';
		this.logService.clearState();
	}


// Generate an RFC4122 version 4 compliant UUID
	generateId() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  	});
	}
}
