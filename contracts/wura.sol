// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

contract goodsExistence {
    struct goodsDetails {
        string name;
        uint256 amount;
        string sizes;
    }

    mapping(uint256 => goodsDetails) private Goods;

    event getGoods(goodsDetails);

    function addGoods(goodsDetails memory GoodsParam) public {
        goodsDetails storage request = Goods[1];
        request.name = GoodsParam.name;
        request.amount = GoodsParam.amount;
        request.sizes = GoodsParam.sizes;

        emit getGoods(request);
    }

    function returnProduct() external view returns (goodsDetails memory SWM) {
        SWM.name = Goods[1].name;
        // SWM.amount = Goods[1].amount;
        // SWM.sizes = Goods[1].sizes;
    }
}
