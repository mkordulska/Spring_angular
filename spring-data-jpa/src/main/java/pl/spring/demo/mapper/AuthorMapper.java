package pl.spring.demo.mapper;

import java.util.HashSet;
import java.util.Set;

import pl.spring.demo.entity.AuthorEntity;
import pl.spring.demo.to.AuthorTo;

public class AuthorMapper {
	public static AuthorTo map(AuthorEntity authorEntity) {
		if (authorEntity != null) {
			return new AuthorTo(authorEntity.getId(), authorEntity.getFirstName(), authorEntity.getLastName());
		}
		return null;
	}

	public static AuthorEntity map(AuthorTo authorTo) {
		if (authorTo != null) {
			return new AuthorEntity(authorTo.getId(), authorTo.getFirstName(), authorTo.getLastName());
		}
		return null;
	}

	public static Set<AuthorTo> map2To(Set<AuthorEntity> authorEntities) {
		Set<AuthorTo> authorTos = new HashSet<>();
		for (AuthorEntity author : authorEntities) {
			authorTos.add(map(author));
		}
		return authorTos;
	}

	public static Set<AuthorEntity> map2Entity(Set<AuthorTo> authorTos) {
		Set<AuthorEntity> authorEntities = new HashSet<>();
		for(AuthorTo author: authorTos){
			authorEntities.add(map(author));
		}
		return authorEntities;
	}

}
