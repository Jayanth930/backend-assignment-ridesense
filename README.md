
# Bike Library Backend

## About The Project
 As stated in the assignment it contains all four basic CRUD api's

### Getting Started

 For this project Node , npm should be installed in your computer
 
 For Node installation , Refer : [Node Installation Guide](https://nodejs.org/en/download/source-code)
 
  Verify the Node and npm installation with 
  ```sh
  node --version
  ```
  ```sh
  npm  --version 
  ```
If you face difficulty with Nodejs Installtion Refer
[Medium trouble shooting Guide](https://medium.com/@asiandigitalhub/troubleshooting-installation-issues-for-node-js-40ef0261e54c)

### Setting Up the Project
1. Clone the Repo
```sh
git clone https://github.com/Jayanth930/backend-assignment-ridesense
```
2. Install the dependencies
```sh
npm install 
```
3. Setup dotenv
```sh
touch .env
```
* Add PORT = 3500 in .env file
* Add DATABASE_URL="file:./dev.db"
4. Setup Sqlite db by running
```sh 
npm run migrate:dev
```
* The above script initializes and applies migrations or  creates schema in sqlite
5. Now install the prisma client by running
```sh
npm i @prisma/client
```
* when you ran npm run migrate:dev prisma itself suggests you to install the prisma-client
5. Now run the server 
```sh
npm run start 
```

### Available API End points

API : To Get all Bikes  
METHOD : **GET**  
ENDPOINT : http://localhost:3500/api/v1/bikes  
OUTPUT : Lists All the bikes  

---

API : To Post a New Bike    
METHOD : **POST**  
ENDPOINT : http://localhost:3500/api/v1/bikes  
Content-Type : application/json  
{  
    &nbsp; &nbsp; &nbsp; "make" : "Latest Latest Bike",  
    &nbsp; &nbsp; &nbsp; "model" : "Ranger 205",  
    &nbsp; &nbsp; &nbsp; "year" : "2024",  
    &nbsp; &nbsp; &nbsp; "type" : "Mountain"  
}

---

API : Update an Existing Bike  
METHOD : **PUT**  
ENDPOINT : http://localhost:3500/api/v1/bikes/:id  
id : UUID  
Content-Type : application/json  
{  
    &nbsp; &nbsp; &nbsp; "make" / "year" / "model" / "type"     
}&nbsp; *Any of the above combination.*  

output : Updated bike details

---

API : Delete an Existing Bike  
METHOD : **DELETE**  
ENDPOINT : http://localhost:3500/api/v1/bikes/:id  
id : UUID   
Output : Deleted Bike details
