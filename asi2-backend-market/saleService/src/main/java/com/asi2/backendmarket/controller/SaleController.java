package com.asi2.backendmarket.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.asi2.backendmarket.dto.SaleDto;
import com.asi2.backendmarket.dto.SaleTransactionDto;
import com.asi2.backendmarket.dto.CardInstanceDto;

import com.asi2.backendmarket.model.Sale;
import com.asi2.backendmarket.rest.sale.ISaleRest;
import com.asi2.backendmarket.service.SaleService;

@RestController
public class SaleController implements ISaleRest {
	
	@Autowired
	SaleService saleService;

	@Autowired
	ModelMapper modelMapper;

	private SaleDto convertToSaleDto(Sale sale, CardInstanceDto card) {
		SaleDto saleDto = modelMapper.map(sale, SaleDto.class);
		saleDto.setCardInstance(card);
	    return saleDto;
	}
	
	@Override
	public List<SaleDto> getAll() {
		return saleService.getAllSales()
			.entrySet()
			.stream()
			.map(entry -> convertToSaleDto(entry.getKey(), entry.getValue()))
			.collect(Collectors.toList());
	}

	@Override
	public void sellCard(@RequestBody SaleTransactionDto saleDto) {
		saleService.sell(saleDto.getIdUser(), saleDto.getIdCard(), saleDto.getPriceSale());
	}
	
	@Override
	public void buyCard(@RequestBody SaleTransactionDto saleDto) {
		saleService.buy(saleDto.getIdSale(), saleDto.getIdUser());
	}

}
