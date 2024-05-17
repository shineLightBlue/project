package com.itheima.test;

import com.getui.push.v2.sdk.ApiHelper;
import com.getui.push.v2.sdk.GtApiConfiguration;
import com.getui.push.v2.sdk.api.PushApi;
import com.getui.push.v2.sdk.common.ApiResult;
import com.getui.push.v2.sdk.dto.req.Audience;
import com.getui.push.v2.sdk.dto.req.Settings;
import com.getui.push.v2.sdk.dto.req.message.PushChannel;
import com.getui.push.v2.sdk.dto.req.message.PushDTO;
import com.getui.push.v2.sdk.dto.req.message.PushMessage;
import com.getui.push.v2.sdk.dto.req.message.android.AndroidDTO;
import com.getui.push.v2.sdk.dto.req.message.android.ThirdNotification;
import com.getui.push.v2.sdk.dto.req.message.android.Ups;
import com.getui.push.v2.sdk.dto.req.message.ios.Alert;
import com.getui.push.v2.sdk.dto.req.message.ios.Aps;
import com.getui.push.v2.sdk.dto.req.message.ios.IosDTO;
import org.junit.jupiter.api.Test;

import java.util.Map;

public class UnipushTest {
    @Test
    public void test1(){
        GtApiConfiguration apiConfiguration = new GtApiConfiguration();
        //填写应用配置，参数在“Uni Push”下的“应用配置”页面中获取
        apiConfiguration.setAppId("nebcaXKlj76VDFGiGg4fi1");
        apiConfiguration.setAppKey("6FHe4O2s5a6FNCFRsEG5a2");
        apiConfiguration.setMasterSecret("i15uQkjvOD8zlQydggNQo2");
        apiConfiguration.setDomain("https://restapi.getui.com/v2/");
        // 实例化ApiHelper对象，用于创建接口对象
        ApiHelper apiHelper = ApiHelper.build(apiConfiguration);
        // 创建对象，建议复用。目前有PushApi、StatisticApi、UserApi
        PushApi pushApi = apiHelper.creatApi(PushApi.class);
        //根据cid进行单推
        PushDTO<Audience> pushDTO = new PushDTO<Audience>();
        // 设置推送参数，requestid需要每次变化唯一
        pushDTO.setRequestId(System.currentTimeMillis() + "");
        Settings settings = new Settings();
        pushDTO.setSettings(settings);
        //消息有效期，走厂商消息必须设置该值
        settings.setTtl(3600000);

        //在线走个推通道时推送的消息体
        PushMessage pushMessage = new PushMessage();
        pushDTO.setPushMessage(pushMessage);
        //此格式的透传消息由 unipush 做了特殊处理，会自动展示通知栏。开发者也可自定义其它格式，在客户端自己处理。
        pushMessage.setTransmission(" {title:\"警告\",content:\"设备告警，请尽快处理\",payload:\"自定义数据\"}");
        // 设置接收人信息
        Audience audience = new Audience();
        pushDTO.setAudience(audience);
        audience.addCid("72c229d5e54b35ea8f94fc77f8d618ce");
        //设置离线推送时的消息体
        PushChannel pushChannel = new PushChannel();
        //安卓离线厂商通道推送的消息体
        AndroidDTO androidDTO = new AndroidDTO();
        Ups ups = new Ups();
        ThirdNotification thirdNotification = new ThirdNotification();
        ups.setNotification(thirdNotification);
        thirdNotification.setTitle("警告");
        thirdNotification.setBody("设备告警,请处理");
        thirdNotification.setClickType("intent");
        //注意：intent参数必须按下方文档（特殊参数说明）要求的固定格式传值，intent错误会导致客户端无法收到消息
        thirdNotification.setIntent("intent://io.dcloud.unipush/?#Intent;scheme=unipush;launchFlags=0x4000000;component=mlink.test/io.dcloud.PandoraEntry;S.UP-OL-SU=true;S.title=测试标题;S.content=测试内容;S.payload=test;end");
        androidDTO.setUps(ups);
        pushChannel.setAndroid(androidDTO);
        pushDTO.setPushChannel(pushChannel);

        // 进行cid单推
        ApiResult<Map<String, Map<String, String>>> apiResult = pushApi.pushToSingleByCid(pushDTO);
        if (apiResult.isSuccess()) {
            // success
            System.out.println(apiResult.getData());
        } else {
            // failed
            System.out.println("code:" + apiResult.getCode() + ", msg: " + apiResult.getMsg());
        }
    }
}
