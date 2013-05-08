package com.example.xpSearchLiang.utils;

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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class XmlReader {


    public static List<Map> readPosts() {
        List<Map> list = new ArrayList<Map>();
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = null;
            InputStream in = XmlReader.class.getResourceAsStream("/sql/posts.xml");
            doc = db.parse(in);
            
            NodeList nList = doc.getElementsByTagName("row");
            for(int i = 0; i< nList.getLength() ; i ++){
                Element entityNode = (Element)nList.item(i);
                Map post = new HashMap();
                NamedNodeMap nameMap = entityNode.getAttributes();
                for (int index=0,length = nameMap.getLength();index<length;index++) {
                    String nodeName =  nameMap.item(index).getNodeName();
                    String value =  nameMap.item(index).getNodeValue();
                	if(nodeName.equals("Body")) {
                        post.put(nodeName, value);
                    }else if(nodeName.equals("Tag")){
                        post.put(nodeName, value);
                    }else if (nodeName.equals("Title")) {
                        post.put(nodeName, value);
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
