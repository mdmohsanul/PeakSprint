import {describe,expect,test} from "@jest/globals"
import {render,screen} from "@testing-library/react"
import { Button } from "./Button"

describe('Button Tests', () => {
     test("should render button" , () => {
        render(<Button onClick={() => {}}/>)
        const element  = screen.getByTestId('button-test')
        expect(element).toBeTruthy()
     })
});
