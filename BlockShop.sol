pragma solidity 0.5.0;

contract marketplace{
    
    address public chairPerson;
    mapping(uint=>address) products;
    mapping(address  => User) registeredUsers;
    event Regsitered(address userAddress);
    event DeRegsitered(address userAddress);
    event Seller(uint256 productId);
    event bought(address buyer,address seller, uint256 price);
    struct User {
        uint tokens;
        bool exists;
    }
    
    constructor () public {
        chairPerson = msg.sender;
   }
    
    function Regsiter(address userAddress) public onlyChairperson {
        if(registeredUsers[userAddress].exists == false) {     
        registeredUsers[userAddress].exists = true;
        registeredUsers[userAddress].tokens = 500;
        emit Regsitered(userAddress);
        }
        else{
            AlreadyRegistered(userAddress);
         }
        }
    function AlreadyRegistered(address userAddress) public view {
        require(!registeredUsers[userAddress].exists, "Already registered");
    }
        
    function UnRegsiter(address userAddress)public onlyChairperson {
        registeredUsers[userAddress].tokens=0;
        delete registeredUsers[userAddress];
        emit DeRegsitered(userAddress);
    }
    
    function Sell(uint256 productId)public isRegisteredUser {
        products[productId] = msg.sender;
        emit Seller(productId);
    }
    
    function Buy(uint256 productId, uint256 price) public isRegisteredUser {
        //check if the prize is not greater than tokens
        require(registeredUsers[msg.sender].tokens > price);
        //mapping productsid to address of seller
        address seller = products[productId];
        settlePayment(msg.sender, seller, price);
    }
    function settlePayment(address buyer, address seller, uint256 price) public{
        registeredUsers[buyer].tokens -= price;
        registeredUsers[seller].tokens += price;
        emit bought(buyer,seller,price);
    }
    function Deposit(uint256 value)public payable returns(uint256){
        registeredUsers[msg.sender].tokens+=value;
    }
    function getBalance(address userAddress) public view returns(uint256){
       return registeredUsers[userAddress].tokens;
    }
    modifier onlyChairperson{
       require(msg.sender==chairPerson, "Has to be the chairperson");
       _;
   }
   modifier isRegisteredUser{
       require(registeredUsers[msg.sender].exists, "Not registered");
       _;
   }

}