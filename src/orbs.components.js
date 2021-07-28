// For documentation on how to use and some extra setup you need to do read the comments inside the function
// This is created by the official creator of Orbs JS to work with it, you made edit it for personal need
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.orbsComponents = {}));
}(this, (function (exports) { 'use strict';
const components = {
	dragableObject: function() {
		//A dragable object script to work with the orbs 'events.mouse' api
		//when the obj is being draged if there is a system that continusly moves the object disable by using
		//if (self.draging != true) { regular stuff... } else { when being draged }
		return new ORBS.scriptComponent(function(self, imps, others){
		if (self.events.mouse.drag == true) {
			if (self.draging != true) {
				if (self.events.mouse.hover == true) {
					self.xOff = others.renderer.events.mouse.x - self.x
					self.yOff = others.renderer.events.mouse.y - self.y
					self.draging = true
				} else {self.draging = false}
			}
			if (self.draging == true) {
			self.x = others.renderer.events.mouse.x - self.xOff
			self.y = others.renderer.events.mouse.y - self.yOff
			}
		} else {
			self.xOff = 0
			self.yOff = 0
			self.draging = false
		}
	})},
	primitiveGravity: function() {
		//A Primitve and Simple Gravity Function
		//make sure to set 'yMove' to 0: yourObj.setVars("yMove", 0)
		//, set a max velocity, replace 150 in the example bellow with your own
		//                           |/|/
		//your obj.setVars("maxVelo", 150)
		//and set a mass for the object, replace 150 in the example bellow with your own
		//                           |/|/
		//your obj.setVars("mass", 2)
		return new ORBS.scriptComponent(function() {
		if (self.y >= ot.screen.height - (self.height/2)) {
			if (self.yMove < 1) {
				self.yMove = 0
				self.y = ot.screen.height - (self.height/2)
			} else {
				self.yMove = self.yMove / -2.5
			}
		}
		if (self.y >= ot.screen.height - (self.height/2)) {
			self.y = ot.screen.height - 49
		}
		if (self.y < ot.screen.height - (self.height/2)) {
			self.yMove += self.mass/1
		}
		if (self.yMove > self.maxVelo) {
			self.yMove = self.maxVelo
		}
		self.dy = self.yMove
	})},
	}

	exports.components = components
	
	Object.defineProperty(exports, '__esModule', { value: true });
})))
