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
 * Servlet implementation class ComponentBarChartServlet
 */
public class ComponentTableServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ComponentTableServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Component BarChart Servlet Start");

		GerritBiz biz = new GerritBiz();
		ArrayList<Table> tableList = biz.getComponentTable();

		request.setAttribute("tableList", tableList);
		System.out.println("TableList setAttribute okay :D");

		RequestDispatcher view = request.getRequestDispatcher("gTable.jsp");
		view.include(request, response);
		
		System.out.println("Component BarChart Servlet finish :D");
	}

}
