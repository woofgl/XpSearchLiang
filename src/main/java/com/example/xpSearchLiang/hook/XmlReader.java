package com.example.xpSearchLiang.hook;

import com.example.xpSearchLiang.entity.Post;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public final class XmlReader {


    public static List<Post> readPosts() {
        List<Post> list = new ArrayList<Post>();
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = null;
            InputStream in = XmlReader.class.getResourceAsStream("/sql/posts.xml");
            doc = db.parse(in);
            
            NodeList nList = doc.getElementsByTagName("row");
            for(int i = 0; i< nList.getLength() ; i ++){
                Element entityNode = (Element)nList.item(i);
                Post post = new Post();
                NamedNodeMap nameMap = entityNode.getAttributes();
                for (int index=0,length = nameMap.getLength();index<length;index++) {
                    String nodeName =  nameMap.item(index).getNodeName();
                    String value =  nameMap.item(index).getNodeValue();
                	if(nodeName.equals("Body")){
                        post.setBody(value);
                    }else if(nodeName.equals("Tag")){
                        post.setTags(value);
                    }else if (nodeName.equals("Title")) {
                        post.setTitle(value);
                    }
                }
                list.add(post);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        }
        
        return list;
    }
    
}
