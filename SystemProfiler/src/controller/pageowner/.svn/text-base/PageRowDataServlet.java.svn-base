package controller.pageowner;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import biz.CpuBiz;
import biz.PageMemBiz;
import entity.CpuEntity;
import entity.CpuSummaryEntity;
import entity.PageOwnerEntity;

public class PageRowDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("PageRowDataServlet Start **");
	    request.setCharacterEncoding( "utf-8" );   
        response.setContentType("text/html; charset=utf-8"); 
	    //사실 별필요 없음
        
        String id = request.getParameter("id");
        String sequence = request.getParameter("sequence");
        String type = request.getParameter("type");
/*        System.out.println("id : " + id);
        System.out.println("sequence : " + sequence);*/
        
		ArrayList<PageOwnerEntity> pageList = new ArrayList<PageOwnerEntity>();
		
        if(id!=null && !id.equals("null")){
			PageMemBiz biz = new PageMemBiz();
			biz.getPageRowData(pageList, id, sequence, type);
        }
        
        StringBuffer writer = new StringBuffer();
        
        PageOwnerEntity entity = null;
        
        writer.append("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n");
//        writer.append(" ,Overhead,Command,Pid,Cpu,Parent,Shared Object,Src Line,Symbol(Function)\n");
        
        writer.append("<pagedata>\n");
        int no = 0;
        for(int i = 0 ; i < pageList.size(); i++){
        	no++;
        	writer.append("\t<row>\n");
        	entity = pageList.get(i);
        	String line = "";
        	line += "\t\t<num>"+no+"</num>\n";
        	line += "\t\t<time>"+entity.getTime()+"</time>\n";
        	line += "\t\t<order>"+entity.getOrder()+"</order>\n";
        	line += "\t\t<memory>"+entity.getMemory()+"</memory>\n";
        	line += "\t\t<pages>"+entity.getPages()+"</pages>\n";
        	line += "\t\t<pid>"+entity.getPid()+"</pid>\n";
        	line += "\t\t<tid>"+entity.getTid()+"</tid>\n";
        	
        	if(entity.getProcess() != null){
        		line += "\t\t<process>"+entity.getProcess()+"</process>\n";
        	}else{
        		line += "\t\t<process></process>\n";
        	}
        	
        	if(entity.getCmd() != null){
        		line += "\t\t<cmd>"+entity.getCmd()+"</cmd>\n";
        	}else{
        		line += "\t\t<cmd></cmd>\n";
        	}
        	
        	if(entity.getModule() != null){
        		line += "\t\t<module>"+entity.getModule()+"</module>\n";
        	}else{
        		line += "\t\t<module></module>\n";
        	}
        	
        	line += "\t\t<type>"+entity.getType()+"</type>\n";
        	line += "\t\t<purpose>"+entity.getKeyword()+"</purpose>\n";
        	
//        	System.out.println(line);
        	
        	writer.append(line+"\t</row>\n");
        }
        writer.append("</pagedata>");
        
//        response.setHeader("Content-Disposition","attachment;filename="+"dfasdfasdf.xml");
        
        ServletOutputStream out = response.getOutputStream();
        InputStream in = new ByteArrayInputStream(writer.toString().getBytes("UTF-8"));
        int index;
        while((index=(in.read())) != -1){
        	out.write(index);
        }
        in.close();
        out.flush();
        out.close();
        return;
	}

}
