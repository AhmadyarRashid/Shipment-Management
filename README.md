# Shipment-Management

1) A backend that has few REST endpoints to modify a persistent storage. 
2) The database will have two modules: Users and Shipments. 
3) The Users will be of two types: Admins and Workers. Admins can add/remove workers and shipments, also they can assign shipments to workers. Workers can update shipments that they are assigned to. One shipment can be assigned to multiple workers. 
4) Create REST endpoints and implement functionality for all the actions mentioned above along with some basic endpoints like login/signup. You have to implement an RBAC functionality to ensure that users can only perform actions that they are allowed to according to the explained rules above. 
5) Each shipment will have a unique ID and a status field. (You can add more fields in the schema if needed). 
6) Implement an endpoint which a worker could call to update the status of a shipment. This endpoint should call an “updateShipment” function which would have the following rules and restrictions: 
7) The function would take two arguments: ID and status. 
8) Whenever the function is called it will generate a random number between 1 and 60. The function will then wait for a number of seconds equal to the random number. After the timeout, the function will call the db to update the status of the shipment. 
9) Also make sure that the executions of updateShipment with the same id never run concurrently (execution always in order and consecutive). 
10) Ensure that whenever the endpoint is hit the updateShipment function is called at least once with the corresponding ID and status passed to it. 
11) Make sure that you keep in mind the scalability of the application while implementing this.
