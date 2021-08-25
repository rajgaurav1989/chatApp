const chat = require("./chat")
// @ponicode
describe("getData", () => {
    let inst

    beforeEach(() => {
        inst = new chat.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getData("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.getData("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.getData("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.getData(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
