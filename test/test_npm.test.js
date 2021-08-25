/**
 * @jest-environment jsdom
 */

const { expect, describe, it } = require('@jest/globals')
const {Vect, ORBS, customMesh, update} = require('../').orbsCore
const document = {}

describe('Test Orbs.js', () => {

	it('returns a vector', () => {
		const myVector = Vect(15, 86)

		expect(myVector.x).toBe(15)
	})

	it('returns a renderer with 40 fps', () => {
		const myRenderer = new ORBS.renderer({renderState: update, bgColor: "crimson", fps: 40, canvas: "op#69", disableImageCache: true})

		expect(myRenderer.fps).toBe(40)
	})

	it('returns a custum Mesh propery tag', () => {
		const myMesh = customMesh

		expect(myMesh).toBe('customMesh')
	})

})