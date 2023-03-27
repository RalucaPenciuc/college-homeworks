package com.company.repository;

import com.company.domain.Nota;
import com.company.domain.Pair;
import com.company.domain.Student;
import com.company.validation.StudentValidator;
import com.company.validation.TemaValidator;
import com.company.validation.ValidationException;
import com.company.validation.Validator;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class NotaXMLRepository extends AbstractXMLRepository<Pair<String, String>, Nota> {

    public NotaXMLRepository(Validator<Nota> validator, String XMLfilename) {
        super(validator, XMLfilename);
        loadFromXmlFile();
    }

    protected Element getElementFromEntity(Nota nota, Document XMLdocument) {
        Element element = XMLdocument.createElement("nota");
        element.setAttribute("ID_Student", nota.getID().getObject1());
        element.setAttribute("ID_Tema", nota.getID().getObject2());

        element.appendChild(createElement(XMLdocument, "Nota", String.valueOf(nota.getNota())));
        element.appendChild(createElement(XMLdocument, "SaptamanaPredare", String.valueOf(nota.getSaptamanaPredare())));
        element.appendChild(createElement(XMLdocument, "Feedback", nota.getFeedback()));

        return element;
    }

    protected Nota getEntityFromNode(Element node) {
        String IDStudent = node.getAttributeNode("ID_Student").getValue();
        String IDTema= node.getAttributeNode("ID_Tema").getValue();
        double nota = Double.parseDouble(node.getElementsByTagName("Nota").item(0).getTextContent());
        int saptamanaPredare = Integer.parseInt(node.getElementsByTagName("SaptamanaPredare").item(0).getTextContent());
        String feedback = node.getElementsByTagName("Feedback").item(0).getTextContent();

        return new Nota(new Pair(IDStudent, IDTema), nota, saptamanaPredare, feedback);
    }

    public void createFile(Nota notaObj) {
        String idStudent = notaObj.getID().getObject1();
        StudentValidator sval = new StudentValidator();
        TemaValidator tval = new TemaValidator();
        StudentXMLRepository srepo = new StudentXMLRepository(sval, "studenti.xml");
        TemaXMLRepository trepo = new TemaXMLRepository(tval, "teme.xml");

        Student student = srepo.findOne(idStudent);
        try {
            Document XMLdocument = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
            Element root = XMLdocument.createElement("NoteStudent");
            XMLdocument.appendChild(root);

            super.findAll().forEach(nota -> {
                if (nota.getID().getObject1().equals(idStudent)) {
                    try {
                        Document XMLstudent = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
                        Element element = XMLstudent.createElement("nota");

                        element.appendChild(createElement(XMLstudent, "Tema", nota.getID().getObject2()));
                        element.appendChild(createElement(XMLstudent, "Nota", String.valueOf(nota.getNota())));
                        element.appendChild(createElement(XMLstudent, "SaptamanaPredare", String.valueOf(nota.getSaptamanaPredare())));
                        element.appendChild(createElement(XMLstudent, "Deadline", String.valueOf(trepo.findOne(nota.getID().getObject2()).getDeadline())));
                        element.appendChild(createElement(XMLstudent, "Feedback", nota.getFeedback()));

                        root.appendChild(element);

                    } catch (ParserConfigurationException e) {
                        e.printStackTrace();
                    }
                }
            });

            Transformer XMLtransformer = TransformerFactory.newInstance().newTransformer();
            XMLtransformer.setOutputProperty(OutputKeys.INDENT, "yes");
            XMLtransformer.transform(new DOMSource(XMLdocument), new StreamResult(XMLfilename));
        }
        catch(ParserConfigurationException pce) {
            pce.printStackTrace();
        }
        catch(TransformerConfigurationException tce) {
            tce.printStackTrace();
        }
        catch(TransformerException te) {
            te.printStackTrace();
        }
    }}
