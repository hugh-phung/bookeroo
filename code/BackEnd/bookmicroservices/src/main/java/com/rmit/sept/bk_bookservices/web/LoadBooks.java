package com.rmit.sept.bk_bookservices.web;

import com.rmit.sept.bk_bookservices.model.Book;
import com.rmit.sept.bk_bookservices.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;

public class LoadBooks {
    private BookService bookService;

    public LoadBooks(BookService bookService)
    {
        this.bookService = bookService;
    }

    public void populate()
    {
        Book book1 = new Book();
        book1.setIsbn("1234567890");
        book1.setTitle("Atomic Habits");
        book1.setAuthor("James Clear");
        book1.setGenre("self-help");
        book1.setImgURL("https://images-na.ssl-images-amazon.com/images/I/81iAADNy2NL.jpg");
        book1.setDescription("Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits.");

        Book book2 = new Book();
        book2.setIsbn("1234567891");
        book2.setTitle("Harry Potter and the Philosopher's Stone");
        book2.setAuthor("J.K Rowling");
        book2.setGenre("fiction");
        book2.setImgURL("https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4088/9781408855652.jpg");
        book2.setDescription("Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.");

        Book book3 = new Book();
        book3.setIsbn("1234567892");
        book3.setTitle("Hunter X Hunter Vol. 1");
        book3.setAuthor("Yoshihiro Togashi");
        book3.setGenre("fiction");
        book3.setImgURL("https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781591167532/hunter-x-hunter-vol-1-9781591167532_hr.jpg");
        book3.setDescription("The story focuses on a young boy named Gon Freecss who discovers that his father, who left him at a young age, is actually a world-renowned Hunter, a licensed professional who specializes in fantastical pursuits.");

        Book book4 = new Book();
        book4.setIsbn("2234567892");
        book4.setTitle("Charlie and the Chocolate Factory");
        book4.setAuthor("Roald Dahl");
        book4.setGenre("kids-teens");
        book4.setImgURL("https://cdn2.penguin.com.au/covers/original/9780141365374.jpg");
        book4.setDescription("Charlie and the Chocolate Factory is a 1964 children's novel by British author Roald Dahl. The story features the adventures of young Charlie Bucket inside the chocolate factory of eccentric chocolatier Willy Wonka.");

        Book book5 = new Book();
        book5.setIsbn("3234567892");
        book5.setTitle("No Longer Human");
        book5.setAuthor("Osamu Dazai");
        book5.setGenre("adult");
        book5.setImgURL("https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1481890798l/11222940._SY475_.jpg");
        book5.setDescription("Portraying himself as a failure, the protagonist of Osamu Dazai's No Longer Human narrates a seemingly normal life even while he feels himself incapable of understanding human beings.");

        bookService.saveBook(book1);
        bookService.saveBook(book2);
        bookService.saveBook(book3);
        bookService.saveBook(book4);
        bookService.saveBook(book5);


    }
}
