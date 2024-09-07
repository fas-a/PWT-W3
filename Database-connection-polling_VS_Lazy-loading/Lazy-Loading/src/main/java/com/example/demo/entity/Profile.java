// src/main/java/com/example/demo/entity/Profile.java
package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@jakarta.persistence.Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String bio;

    // Constructors, getters, setters
    public Profile() {
    }

    public Profile(String bio) {
        this.bio = bio;
    }

    public Profile(User user, String bio) {
        this.user = user;
        this.bio = bio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    @Override
    public String toString() {
        return "Profile{" +
                "id=" + id +
                ", user=" + user +
                ", bio='" + bio + '\'' +
                '}';
    }

}
