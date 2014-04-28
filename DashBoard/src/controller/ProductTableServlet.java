package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.Table;

import biz.GerritBiz;


/**
 * Servlet implementation class ProductBarChartServlet
 */
public class ProductTableServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ProductTableServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("ProductPlatform BarChart Servlet Start");

		GerritBiz biz = new GerritBiz();
		ArrayList<Table> tableList = biz.getProductTable();

		request.setAttribute("tableList", tableList);
		System.out.println("TableList setAttribute okay :D");

		RequestDispatcher view = request.getRequestDispatcher("gTable.jsp");
		view.include(request, response);
		
		System.out.println("ProductPlatform BarChart Servlet finish :D");
	}

}
