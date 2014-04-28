package controller.cpu;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CpuChildTableViewServlet
 */
public class CpuChildTableViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public CpuChildTableViewServlet() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuChildTableViewServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String overhead = request.getParameter("overhead"); 
        String command = request.getParameter("command"); 
        String symbol = request.getParameter("symbol"); 
        String child = request.getParameter("child"); 
        String srcLine = request.getParameter("srcLine"); 
        
        request.setAttribute("overhead", overhead);
		request.setAttribute("command", command);
		request.setAttribute("symbol", symbol);
		request.setAttribute("child", child);
		request.setAttribute("srcLine", srcLine);
		RequestDispatcher view = request.getRequestDispatcher("cpu/cpuchildtable.jsp");
		System.out.println("go to cpu/cpuchildtable.jsp");
		view.forward(request, response);
		
	}
}
