package controller.cpu;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CpuFilteredTableViewServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("CpuTableViewServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
        
        String id = request.getParameter("id");
        System.out.println("id : " + id);
        
        String commandSelected = request.getParameter("commandSelected");
        String pidSelected = request.getParameter("pidSelected");
        String cpuSelected = request.getParameter("cpuSelected");
//        String symbolSelected = request.getParameter("symbolSelected");
        
        
        request.setAttribute("id", id);
        
        //선택된 것이 없으면 처음 프레임셋으로
        if(commandSelected.equals("") && pidSelected.equals("") && cpuSelected.equals("")){
    		RequestDispatcher view = request.getRequestDispatcher("cpu/cputableframeset.jsp");
    		System.out.println("go to cpu/cputableframeset.jsp");
    		view.forward(request, response);
        }else{
        	request.setAttribute("commandSelected", commandSelected);
        	request.setAttribute("pidSelected", pidSelected);
        	request.setAttribute("cpuSelected", cpuSelected);
//        	request.setAttribute("symbolSelected", symbolSelected);
        	RequestDispatcher view = request.getRequestDispatcher("cpu/cputableframesetfiltered.jsp");
    		System.out.println("go to cpu/cputableframesetfiltered.jsp");
    		view.forward(request, response);
        }
	}
}
