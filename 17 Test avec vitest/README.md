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

tester un API :  
https://adequatica.medium.com/api-testing-with-vitest-391697942527  
  
https://runthatline.com/how-to-mock-fetch-api-with-vitest/    
  
Mocking 
https://blog.logrocket.com/advanced-guide-vitest-testing-mocking/  

La librairy de test React (autre que vitest)  
https://testing-library.com/docs/react-testing-library/intro/   

Grafikart.fr  
https://grafikart.fr/tutoriels/react-test-2158  