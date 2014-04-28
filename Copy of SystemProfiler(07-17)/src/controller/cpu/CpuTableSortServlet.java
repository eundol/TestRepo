package controller.cpu;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import entity.CpuEntity;

public class CpuTableSortServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuTableSortServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
        String command = request.getParameter("command");
        String pid = request.getParameter("pid");
        String cpu = request.getParameter("cpu");
        String symbol = request.getParameter("symbol");
        String condition = request.getParameter("condition");
        
        System.out.println("id : " + id);
        System.out.println("command : " + command);
        System.out.println("pid : " + pid);
        System.out.println("cpu : " + cpu);
        System.out.println("symbol : " + symbol);
        System.out.println("condition : " + condition);
        
        ArrayList<CpuEntity> cpuTable = new ArrayList<CpuEntity>();
        
        if(id!=null && !id.equals("null")){
			CpuBiz biz = new CpuBiz();
			biz.getCpuTableSorted(cpuTable, id, command, pid, cpu, symbol, condition);
        }
        
		request.setAttribute("cpuTable", cpuTable);
		request.setAttribute("id", id);
		request.setAttribute("command", command);
		request.setAttribute("pid", pid);
		request.setAttribute("cpu", cpu);
		request.setAttribute("symbol", symbol);
		RequestDispatcher view = request.getRequestDispatcher("cpu/cpuparentframe.jsp");
		System.out.println("go to cpu/cpuparentframe.jsp");
		view.forward(request, response);
        
	}

}
