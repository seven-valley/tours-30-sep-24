# test avec vitest

https://vitest.dev/guide/


## Installer vitest
```
npm i -D vitest jsdom  @testing-library/react
```
## Ajouter  dans package.json
```
"test": "vitest",
```

```json
{
 "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest",
 }
}
```
## Lancer les test
```
npm run test
```

## setup.js
Dans le fichier **setup.js** on s'assurera que notre environnement est bien nettoyé après chaque test.  
  
```js
import {afterEach} from "vitest";  
import {cleanup} from "@testing-library/react";  

afterEach(() => {  
    cleanup()  
})
```

## modifier vite.config.js
Dans le cadre de react-dom, nos tests auront besoin d'interagir avec le DOM, on pourra utiliser jsdom pour que notre code fonctionne sur NodeJS. Dans le cadre de vitest, on l'ajoutera à notre configuration :  
**avant**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

```
**après**
```js
import { defineConfig } from 'vite'  
import react from '@vitejs/plugin-react'  

// https://vitejs.dev/config/  
export default defineConfig({  
  plugins: [react()],  
  test: {  
    environment: 'jsdom',  
    setupFiles: './test/setup.js'  
  }  
})
```

## sum.js
```js
// sum.js
export function sum(a, b) {
  return a + b
}
```

## sum.test.js
```js
// sum.test.js
import { expect, it } from 'vitest'
import { sum } from './sum.js'

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})  
```

# je lance mes tests
```js
npm run test
```
# snapshot
Pour tester un composant le plus simple est de vérifier que la structure HTML corresponde à ce que l'on attend. On pourra aussi utiliser la librairie @testing-library/user-event pour simuler les évènements navigateur.  
  
Vérifier le contenu HTML
https://vitest.dev/guide/snapshot.html

```jsx
import {describe, it, expect} from "vitest";  
import {render, screen} from "@testing-library/react";  
import {Async} from "Async.jsx";  
import {userEvent} from "@testing-library/user-event";  

describe('<Async>', () => {  
  it('toUpperCase', () => {
    const result = toUpperCase('hello')
    expect(result).toMatchInlineSnapshot()
  })
    
})
```
## tester une API
Pour tester une API :  
https://jsonplaceholder.typicode.com/
  
https://jsonplaceholder.typicode.com/posts/3  
  
```js
import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest';

const BEFORE_ALL_TIMEOUT = 30000; // 30 sec
describe('Request fetch ok', () => {
    let response;
    // let body: Array<{ [key: string]: unknown }>;
  
    beforeAll(async () => {
       response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/3',
      );
   
    }, BEFORE_ALL_TIMEOUT);
  
    test('Should have response status 200', () => {
      expect(response.status).toBe(200);
    });
  
    
  });
  ```
  


# les liens

tester un API :  
https://adequatica.medium.com/api-testing-with-vitest-391697942527  
  
https://runthatline.com/how-to-mock-fetch-api-with-vitest/    
  
Mocking  
https://blog.logrocket.com/advanced-guide-vitest-testing-mocking/  

La librairy de test React (autre que vitest)  
https://testing-library.com/docs/react-testing-library/intro/   

Grafikart.fr  
https://grafikart.fr/tutoriels/react-test-2158  

# Objectif
- tester une function
- tester un component
- test une URL d'API
