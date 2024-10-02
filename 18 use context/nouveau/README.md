# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

                -- CONTEXTE --

        -- Définition --

Dans React, un context est un composant particulier (composant d'ordre supérieur) facilitant la communication entre les composants : les composants abonnés à ce dernier peuvent directement interagir avec (lui envoyer des données ou bien les recevoir) sans passer par les props, evitant ainsi le "props drilling" qui apparait immenquablement lorsque l'application React devient plus complexe et possède de nombreux composants.

        -- Les étapes --

1 => construction du contexte (/contexte/CountContext.jsx)
2 => Attribution du context dans l'application (/app.jsx)
3 => Abonnement des composants (/components/Buttons.jsx et /components/Count.jsx)

        -- Le scenario --

On créé un composant compteur (/components/Count.jsx) qui se chargera d'afficher un compteur qui évoluera au fil des actions dans l'application. Il recevra le state "count" géré depuis le context.

Un autre composant (/components/Buttons.jsx) lui servira à modifier le state "count". Au click des buttons, des fonctions permettant de modifier "count" seront déclenchée dans le contexte.

Buttons.jsx ---(click = action)---> Context (contient state et actions) ---(envoie "count")---> Count.jsx

L'exemple présenté ici ne prévoit pas de communication bi-directionnelle. Néanmoins rien n'empèche de la faire. Un état du context peut être modifié par plusieurs composants et plusieurs composants peuvent recevoir les état contenues dans le context.
