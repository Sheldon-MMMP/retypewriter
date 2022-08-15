import { calculatePatch, diffFun, insertTypeValue, removalTypeValue } from "./index"
import _TypeIt from "typeit";

const
    TypeIt = _TypeIt as any,
    heroEl = document.getElementById("hero") as HTMLInputElement,
    inputEl = (document.getElementById("input") as HTMLInputElement),
    outputEl = (document.getElementById("output") as HTMLInputElement);

let input: string = `export default function (input: string, output: string) {
const delta = diffFun(input, output);
const patches = calculatePatch(delta);
const patchesValue = applyPatches(input, patches)
return patchesValue
}`

let output: string = `export default function (input: string, output: string) {
const delta = diff(input, output);
const set = calculatePatch(delta);
return patchesValue
}`

inputEl.value = input;
outputEl.value = output;

inputEl.addEventListener("input", () => {
    input = inputEl.value as string;
    typeItStart()
})
outputEl.addEventListener("input", () => {
    output = outputEl.value as string;
    typeItStart()
})

let typeit: any


function typeItStart() {
    
    if (typeit) {
        typeit.reset()
    }

    heroEl.textContent = input

    typeit = new TypeIt(heroEl, {
        speed:30,
        waitUntilVisible: true
    })

    const patches = calculatePatch(diffFun(input, output));
    
    
    for (let patch of patches) {
        if (patch.type === insertTypeValue) {
            typeit
                .type(patch.text, { delay: 300 })
        } else if (patch.type === removalTypeValue) {
            typeit
                .move(null,{to:"START"})
                .move(patch.from)
                .delete(patch.length)
        }
    }
    typeit.go();
}

typeItStart();
