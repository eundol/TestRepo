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
public class ProductAreaChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ProductAreaChartServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("ProductPlatform AreaChart Servlet Start");

		GerritBiz biz = new GerritBiz();
		ArrayList<Chart> areaChartList = biz.getProductAreaChart();

		request.setAttribute("areaChartList", areaChartList);
		System.out.println("AreaChartList setAttribute okay :D");

		RequestDispatcher view = request.getRequestDispatcher("gAreaChart.jsp");
		view.include(request, response);
		
		System.out.println("ProductPlatform BarChart Servlet finish :D");
	}

}
