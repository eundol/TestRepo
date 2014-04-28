package controller.search;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;

public class SearchResultDeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public SearchResultDeleteServlet() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("SearchResultDeleteServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String[] deleteCheckId =  (String[]) request.getParameterValues("deletecheckid");
        
        System.out.print("checked id : ");
        for(int i = 0 ; i < deleteCheckId.length ; i++){
        	System.out.print(deleteCheckId[i] + " ");
        }
        System.out.println("");
        
        CpuBiz biz = new CpuBiz();
        boolean flag = biz.deleteSearchResult(deleteCheckId);
        
        if(flag){
        	RequestDispatcher view = request.getRequestDispatcher("cpu/correct.html");
    		System.out.println("go to /board/correct.html");
    		view.include(request, response);
        }else{
        	RequestDispatcher view = request.getRequestDispatcher("board/error.html");
    		System.out.println("go to /board/error.html");
    		view.include(request, response);
        }
	}
}
