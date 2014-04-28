package controller.io;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import biz.IoBiz;
import entity.IotopEntity;

public class IoGetReadUsageChartServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("IoGetReadUsageChartServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
		
        String id = request.getParameter("id");
//      System.out.println("id : " + id);

        String created = new CpuBiz().getCreatedFull(id);
      
        ArrayList<IotopEntity> iotopInfo = new ArrayList<IotopEntity>();
        ArrayList<IotopEntity> iotopInfoArrangedByRead = new ArrayList<IotopEntity>();
        ArrayList<String> iotopCommandOrder = new ArrayList<String>();
        int maxSequence = 0;
      
        IoBiz biz = new IoBiz();
        if(!id.equals("null")){
      	    biz.getIotopInformation(id, iotopInfo);
        }
      
        if(!iotopInfo.isEmpty()){
	        HashSet<String> commandSet = new HashSet<String>();
	        for(int inx = 0, size = iotopInfo.size() ; inx < size ; inx++){
	        	commandSet.add(iotopInfo.get(inx).getCommand());
	        }
	        System.out.println("## commandList : " + commandSet);
	        System.out.println("## commandList Size : " + commandSet.size());
	        
	        Iterator<String> comIt = commandSet.iterator();
	        IotopEntity entity = null;
	        
	        while(comIt.hasNext()){
	        	String keyCommand = comIt.next(); 
	        	int sequenceTemp = 0;
	        	
	        	for(int inx = 0, size = iotopInfo.size() ; inx < size ; inx++){
	        		
	        		if(keyCommand.equals(iotopInfo.get(inx).getCommand())){
	        			
	        			entity = new IotopEntity();
	        			entity.setCommand(keyCommand);
        				entity.setSequence(iotopInfo.get(inx).getSequence());
        				entity.setRead(iotopInfo.get(inx).getRead());
	        			
	        			if(sequenceTemp == 0){
	        				
	        				iotopInfoArrangedByRead.add(entity);
	        				sequenceTemp = entity.getSequence();
        					
	        			}else{
	        				
	        				if(entity.getSequence() == sequenceTemp){
	        					iotopInfoArrangedByRead.get(iotopInfoArrangedByRead.size()-1).setRead(iotopInfoArrangedByRead.get(iotopInfoArrangedByRead.size()-1).getRead()+entity.getRead());	        					
	        					
	        				}else{
	        					iotopInfoArrangedByRead.add(entity);
	        					sequenceTemp = entity.getSequence();
	        				}
	        			}
	        		}
	        		
	        	}
	        	
	        	if(maxSequence < sequenceTemp){
	        		maxSequence = sequenceTemp;
	        	}
	        }
	        
        	for(int inx = 1, size = iotopInfoArrangedByRead.size() ; inx < size ; inx++){
	        
				if(iotopInfoArrangedByRead.get(inx).getCommand().equals(iotopInfoArrangedByRead.get(inx-1).getCommand())){
					
	    			if(iotopInfoArrangedByRead.get(inx).getRead() == iotopInfoArrangedByRead.get(inx-1).getRead()){
	    				
	    				iotopInfoArrangedByRead.get(inx).setReadGap(0);
	    				
	    			}else{
	    				
	    				iotopInfoArrangedByRead.get(inx).setReadGap(iotopInfoArrangedByRead.get(inx).getRead() - iotopInfoArrangedByRead.get(inx-1).getRead());
	    				
	    			}
				}
        	}
	        
	        
/*        	for(int inx = 0, size = iotopInfoArrangedByRead.size() ; inx < size ; inx++){
        		iotopInfoArrangedByRead.get(inx).printContents();
        	}*/
	        
	        //순서불러오기 make command order
	        
	        biz.getIotopCommandOrderByRead(id, iotopCommandOrder);
	        
        }
        
        request.setAttribute("created", created);
        request.setAttribute("iotopInfoArrangedByRead", iotopInfoArrangedByRead);
        request.setAttribute("iotopCommandOrder", iotopCommandOrder);
        request.setAttribute("maxSequence", maxSequence);
    		  
//        System.out.println("##################" + maxSequence);
        
		RequestDispatcher view = request.getRequestDispatcher("io/ioreadusagechart.jsp");
		System.out.println("go to io/ioreadusagechart.jsp");
		
		view.forward(request, response);
	}

}
