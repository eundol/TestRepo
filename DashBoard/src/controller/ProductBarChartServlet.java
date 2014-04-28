package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.Chart;

import biz.GerritBiz;


/**
 * Servlet implementation class ProductBarChartServlet
 */
public class ProductBarChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ProductBarChartServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("ProductPlatform BarChart Servlet Start");

		GerritBiz biz = new GerritBiz();
		ArrayList<Chart> barChartList = biz.getProductBarChart();

		request.setAttribute("barChartList", barChartList);
		System.out.println("BarChartList setAttribute okay :D");

		RequestDispatcher view = request.getRequestDispatcher("gBarChart.jsp");
		view.include(request, response);
		
		System.out.println("ProductPlatform BarChart Servlet finish :D");
	}

}
