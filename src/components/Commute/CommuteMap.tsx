import styled from "styled-components";
import { Map, MapMarker, Circle, CustomOverlayMap } from "react-kakao-maps-sdk";
import React, { useEffect, useState } from "react";
import CompanyMarker from "../../assets/commuteMapMarker/company-marker.svg";
import CurrentMarker from "../../assets/commuteMapMarker/current-marker.svg";

const Layout = styled.div`
  width: 100%;
  height: 344px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const CompanyName = styled.p`
  color: #ffffff;
  border-radius: 10px;
  padding: 0.5rem;
  background-color: #ff7f50;
  transform: translateY(-55px);
`;

interface Position {
  latitude: number;
  longitude: number;
}

interface Maps {
  id: number;
  companyName: string;
  latitude: number;
  longitude: number;
}

interface Address {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsInRange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommuteMap({ setAddress, setIsInRange }: Address) {
  const [maps, setMaps] = useState<Maps[]>([]);
  const [position, setPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
  });

  /* 회사명, 위도, 경도 데이터 받아오기 */
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    fetch("https://dev.risetconstruction.net/commute/company-location", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMaps(data));

    // 현재 내 위치 데이터
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      (error) => console.error(error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  /* 위도, 경도를 기반으로한 사용자가 회사 반경 안에 들어왔는지 계산하기 및 주소값 구하기 */
  useEffect(() => {
    // 주소값 구하기
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(position.latitude, position.longitude);

    const callback = function (result: any, status: string) {
      if (status === kakao.maps.services.Status.OK) {
        const arr = [...result];
        setAddress(arr[0].address.address_name);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

    // 사용자가 회사 반경 안에 들어왔는지 계산하기 (하버사인 공식)
    const toRadians = (deg: number) => {
      return deg * (Math.PI / 180);
    };

    const handleInRange = (
      companyLat: number,
      companyLng: number,
      myLat: number,
      myLng: number
    ) => {
      const R = 6371000; // 지구 반지름 (단위: km)
      const phi1 = toRadians(companyLat);
      const phi2 = toRadians(myLat);
      const dLat = toRadians(myLat - companyLat);
      const dLon = toRadians(myLng - companyLng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // 두 지점 간의 거리 (단위: m)

      // 100m 안으로 진입 여부 판단
      if (distance <= 100) {
        return true;
      } else {
        return false;
      }
    };

    // 어떤 지점이라도 상관없이 반경 안에 들어왔을 경우
    const isInRange = maps.some((map) =>
      handleInRange(map.latitude, map.longitude, position.latitude, position.longitude)
    );

    setIsInRange(isInRange);
  }, [position, maps, setAddress, setIsInRange]);

  return (
    <Layout>
      <Map
        center={{ lat: position.latitude, lng: position.longitude }} // 지도 초기 화면
        style={{ width: "100%", height: "100%" }} // 지도 스타일링
        level={3} // 지도 확대
      >
        {maps.length > 0 &&
          maps.map((map) => (
            <div key={map.id}>
              <Circle
                center={{
                  lat: map.latitude,
                  lng: map.longitude,
                }}
                radius={100}
                strokeWeight={4} // 선(두께)
                strokeColor={"var(--color-brand-main)"} // 선(색)
                strokeOpacity={1} // 선(불투명도 0~1)
                strokeStyle={"dash"} // 선(스타일)
                fillColor={"var(--color-brand-orange)"} // 채우기(색)
                fillOpacity={0.5} // 채우기(불투명도)
              />
              <MapMarker
                position={{ lat: map.latitude, lng: map.longitude }}
                image={{
                  src: CompanyMarker, // 다른 이미지로 마커 생성
                  size: {
                    width: 50,
                    height: 50,
                  },
                }}
              />
              <CustomOverlayMap position={{ lat: map.latitude, lng: map.longitude }} yAnchor={1}>
                <CompanyName>{map.companyName}</CompanyName>
              </CustomOverlayMap>
            </div>
          ))}
        <MapMarker
          position={{ lat: position.latitude, lng: position.longitude }}
          image={{
            src: CurrentMarker, // 다른 이미지로 마커 생성
            size: {
              width: 20,
              height: 20,
            },
          }}
        />
      </Map>
    </Layout>
  );
}
