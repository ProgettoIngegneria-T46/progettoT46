# progettoT46
Repo codice implementazione front-end e back-end.<br>
Se il codice non funzionasse è consigliato eseguire il comando:
```properties
npm install
```

# Indice
- [progettoT46](#progettot46)
- [Indice](#indice)
- [Frontend](#frontend)
  - [Testing](#testing)
- [Backend](#backend)
  - [Login](#login)
    - [POST /api/login](#post-apilogin)
    - [POST /api/logout](#post-apilogout)
    - [PUT /api/login](#put-apilogin)
  - [Prodotti](#prodotti)
    - [GET /api/products](#get-apiproducts)
    - [GET /api/product/:id](#get-apiproductid)
    - [GET /api/product/:id/image](#get-apiproductidimage)
    - [PUT /api/product](#put-apiproduct)
    - [DELETE /api/product](#delete-apiproduct)
  - [Corsi](#corsi)
    - [GET /api/courses](#get-apicourses)
    - [GET /api/course/:id](#get-apicourseid)
    - [GET /api/course/:id/image](#get-apicourseidimage)
    - [PUT /api/course](#put-apicourse)
    - [DELETE /api/course](#delete-apicourse)
  - [Abbonamenti](#abbonamenti)
    - [GET /api/memberships](#get-apimemberships)
    - [GET /api/membership/:id](#get-apimembershipid)
    - [GET /api/membership/:id/image](#get-apimembershipidimage)
    - [PUT /api/membership](#put-apimembership)
    - [DELETE /api/membership](#delete-apimembership)
  - [Testing](#testing-1)

# Frontend
Per eseguire il frontend è necessario accedere alla cartella frontend e avviarlo tramite il comando:
```properties
npm start
```
Sarà necessario avere la porta 4200 non occupata sul proprio dispositivo.

---------------------
## Testing
Per eseguire i test è necessario accedere alla cartella frontend e avviarli tramite il comando:
```properties
npm test
```
Una volta usato verrà aperta una pagina web con i risultati dei test.

# Backend
Per eseguire il server è necessario accedere alla cartella server e avviarlo tramite il comando:
```properties
node .
```
Sarà necessario avere la porta 3000 non occupata sul proprio dispositivo.

## Login
### <span style="color: gold">POST</span> /api/login
**Descrizione:**
Effettua il login alla piattaforma.

**Parametri** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    email: string,
    password: SHA256(string)
}
```

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    token: string
}
```

### <span style="color: gold">POST</span> /api/logout
**Descrizione:**
Effettua il logout dal sistema eliminando il token di accesso presente nel database.

**Parametri** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    token: string
}
```
### <span style="color: gold">PUT</span> /api/login
**Descrizione:**
Permette la registrazione alla piattaforma.

**Parametri** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    cf: string,
    name: string,
    surname: string,
    birthDate: Date,
    phoneNumber: string,
    email: string,
    address: string,
    password: SHA256(string),
    subscriptionDate: Date | undefined
}

```

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    token: string
}
``` 
-----------------
## Prodotti
### <span style="color: gold">GET</span> /api/products
**Descrizione:**
Richiede le informazioni di tutti i prodotti al database.

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
[
    {
        id: string,
        name: string,
        price: number,
        description: string | undefined
    }
]
```
### <span style="color: gold">GET</span> /api/product/:id
**Descrizione:**
Richiede le informazioni di un prodotto al database.

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    id: string,
    name: string,
    price: number,
    description: string | undefined
}
```
### <span style="color: gold">GET</span> /api/product/:id/image
**Descrizione:**
Richiede l'immagine di un prodotto. Restituisce l'immagine notFound se quella indicata non viene trovata

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
immagine: File
```
### <span style="color: gold">PUT</span> /api/product
**Descrizione:**
Aggiunge un prodotto al database.

**Parametri** -> <span style="color: #d84d3e">Multipart/Form-data</span>
```typescript
{
    token: string,
    name: string,
    price: number,
    description: string,
    file: File
}
```
**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    id: string
}
```
### <span style="color: gold">DELETE</span> /api/product
**Descrizione:**
Elimina un prodotto dal database.

**Parametri** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    token: string,
    productID: string
}
```
-------------------------------
## Corsi
### <span style="color: gold">GET</span> /api/courses
**Descrizione:**
Richiede le informazioni di tutti i corsi al database.

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
[
    {
        _id: string,
        name: string,
        price: number,
        description: string | undefined,
        endDate: Date,
        subscriptions: number | undefined
    }
]
```
### <span style="color: gold">GET</span> /api/course/:id
**Descrizione:**
Richiede le informazioni di un corso al database.

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    _id: string,
    name: string,
    price: number,
    description: string | undefined,
    endDate: Date,
    subscriptions: number | undefined
}
```
### <span style="color: gold">GET</span> /api/course/:id/image
**Descrizione:**
Richiede l'immagine di un corso. Restituisce l'immagine notFound se quella indicata non viene trovata

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
immagine: File
```
### <span style="color: gold">PUT</span> /api/course
**Descrizione:**
Aggiunge un corso al database.

**Parametri** -> <span style="color: #d84d3e">Multipart/Form-data</span>
```typescript
{
    token: string,
    name: string,
    price: number,
    description: string,
    endDate: Date,
    file: File
}
```
**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    id: string
}
```
### <span style="color: gold">DELETE</span> /api/course
**Descrizione:**
Elimina un corso dal database.

**Parametri** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    token: string,
    courseID: string
}
```
-------------------------------

## Abbonamenti
### <span style="color: gold">GET</span> /api/memberships
**Descrizione:**
Richiede le informazioni di tutti gli abbonamenti al database.

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
[
    {
        _id: string,
        name: string,
        price: number,
        description: string | undefined,
        endDate: Date
    }
]
```
### <span style="color: gold">GET</span> /api/membership/:id
**Descrizione:**
Richiede le informazioni di un abbonamento al database.

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    _id: string,
    name: string,
    price: number,
    description: string | undefined,
    endDate: Date
}
```
### <span style="color: gold">GET</span> /api/membership/:id/image
**Descrizione:**
Richiede l'immagine di un abbonamento. Restituisce l'immagine notFound se quella indicata non viene trovata

**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
immagine: File
```
### <span style="color: gold">PUT</span> /api/membership
**Descrizione:**
Aggiunge un abbonamento al database.

**Parametri** -> <span style="color: #d84d3e">Multipart/Form-data</span>
```typescript
{
    token: string,
    name: string,
    price: number,
    description: string,
    endDate: Date
    file: File
}
```
**Risposta** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    id: string
}
```
### <span style="color: gold">DELETE</span> /api/membership
**Descrizione:**
Elimina un abbonamento dal database.

**Parametri** -> <span style="color: #d84d3e">Application/JSON</span>
```typescript
{
    token: string,
    membershipID: string
}
```
----------------
## Testing
Per eseguire i test è necessario accedere alla cartella server e avviarli tramite il comando:
```properties
npm run test
```
Una volta usato verrà aperta una pagina web con i risultati dei test.