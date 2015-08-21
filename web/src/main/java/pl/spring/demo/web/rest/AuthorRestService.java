package pl.spring.demo.web.rest;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pl.spring.demo.service.AuthorService;
import pl.spring.demo.to.AuthorTo;

@RestController
@RequestMapping(value = "/authors")
public class AuthorRestService {
	@Autowired
	private AuthorService authorService;

	@RequestMapping(value = "/author-list", method = RequestMethod.GET)
	public Set<AuthorTo> findAllAuthors() {
		return authorService.findAllAuthors();
	}

}
