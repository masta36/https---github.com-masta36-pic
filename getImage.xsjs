var id = $.request.parameters.get("pid");  
var elem = $.request.parameters.get("element");  
var conn = $.db.getConnection();
var query = "";
try {  
    query = "SELECT CONTENT FROM \"NEO_03JLKU59NURG8J4LN3VTUGSN6\".\"PIC_BINARY\" WHERE id = ? AND ELEMENT = ?";
  
    var pstmt = conn.prepareStatement(query);  
    pstmt.setInteger(1,parseInt(id));  
    pstmt.setString(2,elem); 
    var rs = pstmt.executeQuery();  
    if(rs.next()){  
        $.response.headers.set("Content-Disposition", "Content-Disposition: attachment; filename=image.jpg");  
        $.response.contentType = 'image/jpg';  
        $.response.setBody(rs.getBlob(1));  
    }  
} catch (e) {  
	 $.response.contentType = "text/html";
	 $.response.setBody( "Error reading: " + query + " for data: " + id + " / " + elem);
}                         
  
  
  
  
conn.close();  