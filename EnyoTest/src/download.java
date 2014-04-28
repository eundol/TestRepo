import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class download extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		System.out.println("download Servlet~");

		String filePath = request.getParameter("filePath");
		String fileName = request.getParameter("fileName");
		System.out.println(filePath);
		System.out.println(fileName);

		// �ٿ�ε� �˸�â�� �ߵ��� �ϱ� ���ؼ� ����Ʈ Ÿ���� 8��Ʈ ���̳ʸ��� �����Ѵ�.
	    response.setContentType("application/octet-stream");
	     
	    // ����� ���� �̸��� �����Ѵ�.
	    response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
	
	    // �����н� �� ���ϸ��� �����Ѵ�.
	    File file = new File(filePath);
	    
	    byte bytestream[] = new byte[2048000];
	    
	    // response out�� ���� ������ ����Ѵ�.
	    if (file.isFile() && file.length() > 0){
	         
	        FileInputStream fis = new FileInputStream(file);
	        BufferedInputStream bis = new BufferedInputStream(fis);
	        BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
	             
	        int read = 0;
	             
	        while ((read = bis.read(bytestream)) != -1){
	            bos.write(bytestream , 0, read);
	        }
	         
	        bos.close();
	        bis.close();
	    }
	}
}
