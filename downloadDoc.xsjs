var id = $.request.parameters.get("pid");  
var elem = $.request.parameters.get("element");  
var conn = $.db.getConnection();
var query = "";
var fname = "";
try {  
    query = "SELECT CONTENT FROM \"NEO_03JLKU59NURG8J4LN3VTUGSN6\".\"PIC_BINARY\" WHERE id = ? AND ELEMENT = ?";
  
    var pstmt = conn.prepareStatement(query);  
    pstmt.setInteger(1,parseInt(id));  
    pstmt.setString(2,elem); 
    var rs = pstmt.executeQuery();  
    if(rs.next()){  
    	//read additional file-info:
    	var info = "SELECT NAME FROM \"NEO_03JLKU59NURG8J4LN3VTUGSN6\".\"PIC_ENTRYDOCS\" WHERE id = ? AND ELEMENT = ?";
    	pstmt = conn.prepareStatement(info);  
        pstmt.setInteger(1,parseInt(id));  
        pstmt.setString(2,elem); 
        var rs_info = pstmt.executeQuery(); 
        rs_info.next();
        fname = rs_info.getString(1);

        $.response.headers.set("Content-disposition", "attachment; filename="+ fname);
        $.response.contentType = '"application/pdf"';  
        $.response.status = $.net.http.OK;
        
        $.response.setBody(rs.getBlob(1)); 
         
    }  
} catch (e) {  
	 $.response.contentType = "text/html";
	 $.response.setBody( "Error reading: " + fname + " for data: " + id + " / " + elem);
}                         
  
  
  
  
conn.close();  