package com.mmall.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by 24102 on 2017/6/12.
 */
public interface IFileService {
    String upload(MultipartFile file, String path);
}
