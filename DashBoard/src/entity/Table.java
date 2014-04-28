package entity;

public class Table {

	private int rowCount;
	private String[] projectName;
	private int[] columnData;
	
	/* ****** Constructor ****** */
	public Table(){
		
	}
	
	public Table(int rowCount, String[] projectName, int[] columnData){
		super(); 	
		this.rowCount = rowCount;
		this.projectName = projectName;
		this.columnData = columnData;
	}
	
	/* ****** method ****** */
	public int getRowCount()
	{
		return rowCount;
	}
	
	public String[] getProjectName()
	{
		return projectName;
	}
	
	public int[] getColumnData()
	{
		return columnData;
	}
}
