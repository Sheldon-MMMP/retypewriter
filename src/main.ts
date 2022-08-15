import {calculatePatch, diffFun, insertTypeValue, removalTypeValue} from "./index"
import TypeIt from "typeit";

const
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
const patchesValue = applyPatches(input, patches)
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


    typeit = new (TypeIt as any)(heroEl, {
        speed: 50,
        waitUntilVisible: true
    });

    const patches = calculatePatch(diffFun(input, output));

    for (let patch of patches) {
        if (patch.type === insertTypeValue) {
            typeit.type(patch.text, {delay: 300})
        } else if (patch.type === removalTypeValue) {
            typeit.type(patch.text, {delay: 300})
                .pause(200)
                .delete(patch.length, {delay: 1000})
        }
    }
    typeit.go();
}

typeItStart();
