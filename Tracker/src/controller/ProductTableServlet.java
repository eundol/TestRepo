package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.TrackerBiz;
import entity.PiChart;
import entity.Table;

/**
 * Servlet implementation class ProductTableServlet
 */
public class ProductTableServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   public ProductTableServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("ProductPlatform Table Servlet start");	// console log
        
		TrackerBiz biz = new TrackerBiz();	// create biz object
		ArrayList<Table> tableList = biz.getProductTable();
		
		request.setAttribute("tableList", tableList);
		System.out.println("setAttribute okay :D");
		
		RequestDispatcher view = request.getRequestDispatcher("tTable.jsp");
		view.include(request, response);	

		System.out.println("ProductPlatform Table Servlet fininsh");
	}
}
