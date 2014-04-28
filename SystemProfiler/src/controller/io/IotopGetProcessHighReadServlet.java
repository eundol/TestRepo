package controller.io;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import biz.IoBiz;
import entity.IotopEntity;

public class IotopGetProcessHighReadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("IotopGetProcessHighReadServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
//      System.out.println("id : " + id);

        String created = new CpuBiz().getCreatedFull(id);
      
        ArrayList<IotopEntity> iotopInfo = new ArrayList<IotopEntity>();
        int maxSequence = 0;
      
        IoBiz biz = new IoBiz();
        if(!id.equals("null")){
      	    biz.getIotopHighreadInformation(id, iotopInfo);
        }
      
        maxSequence = iotopInfo.get(0).getSequence();
	        
        	/*for(int inx = 0, size = iotopInfoArrangedByRead.size() ; inx < size ; inx++){
        		iotopInfoArrangedByRead.get(inx).printContents();
        	}*/
	        
	        //순서불러오기 make command order
	        
        request.setAttribute("created", created);
        request.setAttribute("iotopInfo", iotopInfo);
        request.setAttribute("maxSequence", maxSequence);
    		  
//        System.out.println("##################" + maxSequence);
        
		RequestDispatcher view = request.getRequestDispatcher("io/iotophighreadchart.jsp");
		System.out.println("go to io/iotophighreadchart.jsp");
		
		view.forward(request, response);
	}

}
