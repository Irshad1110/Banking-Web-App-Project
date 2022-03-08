package com.thbs.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thbs.banking.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Long>{

	
	Customer findByEmailAndPassword(String email, String password);

	Customer findByAccountNo(String accountNum);

}
