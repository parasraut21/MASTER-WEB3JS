// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

 contract demo {
     uint x =10;

     function getX() public view returns(uint){
         return x;
     }

     function setX(uint _x) public  {
       x = _x ;
     }
 }